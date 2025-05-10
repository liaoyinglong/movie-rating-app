'use client';
import { LoginDialog } from '@/components/login-dialog';
import { toaster } from '@/components/ui/toaster';
import { ModalIds } from '@/constants/modal-ids';
import { rateMovie } from '@/server-actions/rate-movie';
import { ResponseCode } from '@/utils/response';
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  RatingGroup,
  Textarea,
} from '@chakra-ui/react';
import { useActionState } from 'react';
import { MdStar } from 'react-icons/md';

export function RatingTrigger(props: { movieId: string }) {
  const [, rateFormAction, isPending] = useActionState(
    async (state: void, formData: FormData) => {
      const result = await rateMovie({
        movieId: props.movieId,
        score: Number(formData.get('score')),
        comment: String(formData.get('comment')),
      });
      if (result?.success) {
        toaster.create({
          description: '评价成功',
          type: 'success',
        });
        return;
      }

      toaster.create({
        description: result?.errorMessage ?? '评价失败',
        type: 'error',
      });
      if (result?.code === ResponseCode.Unauthorized) {
        LoginDialog.open(ModalIds.LoginDialog, {});
        return;
      }
    },
    void 0,
  );

  return (
    <Dialog.Root placement={'center'}>
      <Dialog.Trigger asChild>
        <Button
          className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2"
          rounded={'full'}
          size={'lg'}
          data-testid="rating-trigger"
        >
          <MdStar size={20} />
          去评价
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            className={'mx-2 md:mx-auto'}
            data-testid="rating-dialog"
          >
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>评价</Dialog.Title>
            </Dialog.Header>
            <Dialog.Context>
              {(store) => {
                return (
                  <form
                    className={'flex flex-1 flex-col'}
                    action={rateFormAction}
                  >
                    <Dialog.Body className="flex flex-col gap-4">
                      <RatingGroup.Root count={5} defaultValue={5}>
                        <RatingGroup.HiddenInput name={'score'} />
                        <RatingGroup.Control />
                      </RatingGroup.Root>
                      <Textarea
                        placeholder="写下你的评论..."
                        size="lg"
                        autoresize
                        name={'comment'}
                        autoFocus
                        data-testid="rating-dialog-comment"
                      />
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Button
                        variant="outline"
                        onClick={() => store.setOpen(false)}
                        data-testid="rating-dialog-cancel"
                      >
                        取消
                      </Button>
                      <Button
                        type={'submit'}
                        loading={isPending}
                        data-testid="rating-dialog-submit"
                      >
                        提交
                      </Button>
                    </Dialog.Footer>
                  </form>
                );
              }}
            </Dialog.Context>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

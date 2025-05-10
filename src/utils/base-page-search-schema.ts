import z from 'zod';

export const basePageSearchSchema = z.object({
  pageIndex: z.preprocess(Number, z.number().min(1).default(1).catch(1)),
  pageSize: z.preprocess(Number, z.number().min(1).default(10).catch(10)),
});

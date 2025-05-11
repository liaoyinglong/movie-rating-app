import { getServerI18n } from '@/i18n/server';

const ReleaseTime = new Date().toISOString();

export default async function VersionPage() {
  const { t } = await getServerI18n('version');
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 transition-colors duration-300 dark:bg-gray-900">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">
        {t('version:version-info')}
      </h1>
      <ul className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <li className="flex flex-col sm:flex-row sm:items-center">
          <strong className="mr-2 mb-1 text-gray-700 sm:mb-0 dark:text-gray-300">
            {t('version:deploy-time')}
          </strong>
          <span className="break-all text-gray-900 dark:text-gray-100">
            {ReleaseTime}
          </span>
        </li>
      </ul>
    </main>
  );
}

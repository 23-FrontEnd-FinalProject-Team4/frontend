import ResetPasswordFormSection from './_components/ResetPasswordFormSection';

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { token } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center p-4">
      <section className="bg-background-primary w-full max-w-[550px] rounded-2xl p-8 md:p-18">
        <h1 className="mb-10 text-center text-xl font-semibold">비밀번호 재설정</h1>
        <ResetPasswordFormSection token={token} />
      </section>
    </main>
  );
};

export default ResetPasswordPage;

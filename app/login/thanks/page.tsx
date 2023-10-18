import assets from "@/assets";

export default function Thanks() {
  return (
    <div className="bg-white p-9">
      <div className="flex flex-col max-w-md my-4 mx-auto items-center">
        <img className="h-28 w-auto" src={assets.checked.src} alt="checked" />
        <div
          className="font-bold text-2xl text-center"
          style={{
            margin: "16px 0 8px",
          }}
        >
          Password reset
        </div>

        <div className="text-sm font-normal text-center">
          <p className="mb-6">
            Check your email for a link to reset your password
          </p>
          <p className="mb-6">
            The link sent to your email will provide you with a screen to enter
            your new password.
          </p>
          <p className="mb-6">
            If you do not receive an email, please check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}

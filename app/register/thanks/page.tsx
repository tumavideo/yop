export default function Thanks() {
  return (
    <div className="bg-white p-9">
      <div className="flex flex-col max-w-md my-4 mx-auto items-center">
        <div
          className="flex justify-center items-center w-52 h-52"
          style={{
            backgroundColor: "rgb(246, 245, 254)",
          }}
        >
          image here
        </div>
        <div
          className="font-bold text-2xl text-center"
          style={{
            margin: "16px 0 8px",
          }}
        >
          Thanks for Signing Up!
        </div>

        <div className="text-sm font-normal text-center">
          <p className="mb-6">
            Congratulations! You have successfully joined Zambia's fastest
            growing professional community!
          </p>
          <p className="mb-6">
            Keep an eye on your inbox, you will receive an email confirmation
            shortly. If this is your first time you will be provided with a
            link, once clicked, to sign in automatically.
          </p>
          <p className="mb-6">
            If you do not receive an email, please check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}

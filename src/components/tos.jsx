export default function TOS({ setTos }) {
  return (
    <>
      <div className="h-1/4" />
      <div className="relative w-full lg:w-2/3 px-5 bg-base-100 py-5 drop-shadow">
        <div className="text-2xl font-bold underline italic mb-2">
          Terms of Service
        </div>
        <div className="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="flex justify-center">
          <button
            className="btn btn-primary px-10"
            onClick={() => setTos(true)}
          >
            I Agree
          </button>
        </div>
      </div>
    </>
  );
}

export default function Contact() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold text-center bg-base-300 w-full py-3">
        Have any questions? Feel free to contact us!
      </div>
      <div className="w-full lg:w-2/3 p-3 grid grid-cols-2">
        <div className="flex items-center space-x-2">
          <div className="italic">E-mail:</div>
          <div>support@hhfoundation.com</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="italic">Phone Number:</div>
          <div>1-234-567-8901</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="italic">Instagram</div>
          <div>@hhfoundation</div>
        </div>
      </div>
    </div>
  );
}

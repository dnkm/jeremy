export default function Modal({ close, children }) {
  return (
    <div
      onClick={close}
      className="fixed min-h-screen w-screen top-0 flex justify-center items-center"
      style={{ height: "1px", background: "rgba(0, 0, 0, 0.5)" }}
    >
      {children}
    </div>
  );
}

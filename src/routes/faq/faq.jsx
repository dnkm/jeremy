import Contact from "./contact";

const QA = [
  {
    question: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
    answer: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
  },
  {
    question: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
    answer: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
  },
  {
    question: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
    answer: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
  },
];

export default function Faq() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-center w-full">
        <div className="text-xl font-bold text-center py-3 bg-base-300 w-full">
          Frequently Asked Questions
        </div>
        <div className="w-full lg:w-2/3">
          {QA.map((q, i) => (
            <div className="p-3" key={i}>
              <div className="font-bold">Q: {q.question}</div>
              <div className="italic">A: {q.answer}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow" />
      <Contact />
    </div>
  );
}

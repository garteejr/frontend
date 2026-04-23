interface ResultMessageProps {
  message: string;
  type: 'correct' | 'wrong' | null;
}

export default function ResultMessage({ message, type }: ResultMessageProps) {
  if (!type) return null;
  return (
    <div
      className={`text-center px-3 py-3 rounded-xl font-bold text-[15px] mt-3 transition-all duration-300 ${
        type === 'correct' ? 'result-correct' : 'result-wrong'
      }`}
    >
      {message}
    </div>
  );
}

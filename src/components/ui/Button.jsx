export default function Button({
  disabled,
  text,
  disabledText,
  onClick,
  type,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3 px-4 mt-2 text-sm font-semibold text-white 
                       bg-blue-900 cursor-pointer hover:bg-blue-950 focus:bg-blue-950 
                       rounded-md transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {disabled ? disabledText : text}
    </button>
  );
}

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ ...props }) => {
  const baseStyle =
    'mb-1 rounded border border-border px-2 py-1 text-primary/80 outline-none placeholder:italic';
  let extraStyle = '';
  if (props.type === 'checkbox') {
    extraStyle = 'accent-purple-500';
  }
  return <input {...props} className={cn(baseStyle, extraStyle)} />;
};

export default Input;

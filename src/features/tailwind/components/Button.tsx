import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color: string;
  showIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, color, showIcon, ...props }) => {
  const baseButtonStyle =
    'rounded-lg px-4 py-2 hover:opacity-80 hover:transition hover:duration-300 disabled:bg-currentColor/40 hover:disabled:opacity-100';
  const primaryButtonStyle = 'bg-primary text-white';
  const secondaryButtonStyle = 'bg-secondary text-white';
  return (
    <button {...props} className={cn(baseButtonStyle, color === 'primary' && primaryButtonStyle)}>
      {title}
    </button>
  );
};

export default Button;

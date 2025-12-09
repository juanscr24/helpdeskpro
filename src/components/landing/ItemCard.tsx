interface ItemCardProps {
  icon: string;
  text: string;
  variant?: 'problem' | 'solution';
}

export const ItemCard = ({ icon, text, variant = 'problem' }: ItemCardProps) => {
  const borderColor = variant === 'solution' ? 'border-primary-200' : 'border-gray-200';
  const shadowClass = variant === 'solution' ? 'shadow-sm' : '';
  
  return (
    <div className={`flex items-start gap-3 bg-white p-4 rounded-lg border ${borderColor} ${shadowClass}`}>
      <span className="text-2xl">{icon}</span>
      <p className="text-gray-700 pt-1">{text}</p>
    </div>
  );
};

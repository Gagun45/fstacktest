interface Props {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: Props) => {
  return (
    <div className="text-center mb-6 space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;

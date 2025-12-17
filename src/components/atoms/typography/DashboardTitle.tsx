interface DashboardTitleProps {
  head: string;
  body: string;
}

export default function DashboardTitle({ head, body }: DashboardTitleProps) {
  return (
    <div className="mb-7 w-full max-w-xl">
      <h1 className="text-4xl font-extrabold">{head}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

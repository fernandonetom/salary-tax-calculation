type props = React.HtmlHTMLAttributes<HTMLDivElement>;

export const Content = ({ children }: props) => {
  return <main className="min-h-screen flex flex-col">{children}</main>;
};

type props = React.HtmlHTMLAttributes<HTMLDivElement>;

export const Header = ({ children }: props) => {
  return <header className="flex justify-end p-2">{children}</header>;
};

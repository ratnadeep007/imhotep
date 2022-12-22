interface Props {
  childern: React.ReactNode;
}

export default function MainLayout({ childern }: Props) {
  return <>{childern}</>;
}
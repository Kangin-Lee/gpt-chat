type Props = {
  message: string;
};

export function FormMessage({ message }: Props) {
  return <p className="text-sm ml-1 mt-1 text-red-600">{message}</p>;
}

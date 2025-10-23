type Props = {
    data?: string;
}

const Index = ({ data = 'Hola mundo' }: Props) => {
  return (
    <div>{ data }</div>
  )
}

export default Index
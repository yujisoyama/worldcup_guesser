interface IHomeProps {
  count: number;
}

export default function Home(props: IHomeProps) {
  return (
    <h1>Contagem: {props.count}</h1>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/polls/count');
  const data = await response.json();
  console.log(data);
  return {
    props: {
      count: data.count,
    }
  }
}


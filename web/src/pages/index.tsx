import Image from 'next/image';
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { create } from 'domain';
import { FormEvent, useState } from 'react';

interface IHomeProps {
  pollCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: IHomeProps) {
  const [pollTitle, setPollTitle] = useState('');

  const createPoll = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post('polls', {
        title: pollTitle
      });
      const { code } = response.data;
      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência.')
      setPollTitle('');
    } catch (error) {
      console.log(error);
      alert('Falha ao criar o bolão. Tente novamente')
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <main>
        <Image src={logoImg} alt='NLW Copa' />
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarImg} alt="" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>
        <form onSubmit={createPoll} className='mt-10 flex gap-2'>
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type="text"
            required
            placeholder='Qual nome do seu bolão?'
            value={pollTitle}
            onChange={event => setPollTitle(event.target.value)}
          />
          <button className='bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase hover:bg-yellow-700' type="submit">
            Criar meu bolão
          </button>
        </form>
        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar o seu bolão, você receberá um código único que poderá usar para convidar os seus amigos.
        </p>
        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt='' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.pollCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className='w-px h-14 bg-gray-600' />
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt='' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites Enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt="Celulares exibindo uma prévia da aplicação mobile"
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [pollCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('polls/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      pollCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}


import Button from '@/features/tailwind/components/Button';
import Input from '@/features/tailwind/components/Input';
import { Select, SelectOption } from '@/features/tailwind/components/Select';
import { Button as JoseButton } from '@/features/tailwind/components/JoseButton';
import { Button as ShadcnButton } from '@/features/tailwind/components/ShadcnButton';

export default function TailwindPage() {
  return (
    <div className='py-10'>
      <div className='container'>
        <p>Custom design system</p>
        <div className='my-4'>
          <Button title='Button' color='primary' />
        </div>
        <div className='my-4'>
          <Button title='Button' color='primary' disabled />
          <Input placeholder='E-mail' type='text' />
          <Input disabled />
          <Input type='date' />
          <Input type='checkbox' />
        </div>
        <div className='my-4'>
          <Select>
            <SelectOption>Option 1</SelectOption>
            <SelectOption>Option 2</SelectOption>
            <SelectOption>Option 3</SelectOption>
          </Select>
        </div>
        <div className='my-4'>
          <JoseButton>Jose Button</JoseButton>
          <JoseButton variant='link' href='/'>
            Jose Button Link
          </JoseButton>
        </div>
        <div className='my-4'>
          <ShadcnButton>Shadcn normal</ShadcnButton>
          <ShadcnButton asChild>
            <a href='/'>{`This is <a>`}</a>
          </ShadcnButton>
        </div>
      </div>
    </div>
  );
}

import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type AvatarCustomerProps = {
    iniciales: string;
    imageAvatar?: string;
};

const AvatarCustomer = ({ iniciales, imageAvatar }: AvatarCustomerProps) => {
    const getInitials = useInitials();
    
    return (
        <Avatar className="size-12 overflow-hidden rounded-full">
            <AvatarImage src={imageAvatar} alt={iniciales} />
            <AvatarFallback className="rounded-full bg-secondary/40 font-bold text-primary dark:bg-primary/40 dark:text-white">
                {getInitials(iniciales)}
            </AvatarFallback>
        </Avatar>
    );
};

export default AvatarCustomer;

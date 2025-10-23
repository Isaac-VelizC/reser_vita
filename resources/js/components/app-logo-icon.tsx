import { ImgHTMLAttributes } from 'react';
import LogoIcon from "@/assets/imgs/logo-app.svg";

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img {...props} src={LogoIcon} alt='Belleza Total Software' width={24} height={24} />
    );
}



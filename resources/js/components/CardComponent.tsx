import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type CardComponentProps = {
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
    colorIcon?: string;
};

const CardComponent = ({
    icon: Icon,
    title,
    description,
    children,
    colorIcon = "primary",
}: CardComponentProps) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div className={`mr-2 flex h-10 w-10 items-center justify-center rounded-xl bg-${colorIcon}/10`}>
                        <Icon className={`h-5 w-5 text-${colorIcon}`} />
                    </div>
                    <div>
                        <CardTitle>
                            {title}
                        </CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};

export default CardComponent;

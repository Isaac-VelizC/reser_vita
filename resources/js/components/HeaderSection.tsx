import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

type HeaderSectionProps = {
    title: string;
    description?: string;
    contentRight?: React.ReactNode;
};

const HeaderSection = ({ title, description, contentRight }: HeaderSectionProps) => {
    return (
        <Card>
            <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <CardTitle>
                            {title}
                        </CardTitle>
                        <CardDescription>
                        {description && description}
                        </CardDescription>
                    </div>
                    <div>
                        {contentRight}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default HeaderSection;

import { Info } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type SecurityTip = {
    text: string;
};

type SecurityTipsCardProps = {
    title?: string;
    tips: SecurityTip[];
};

const SecurityTipsCard: React.FC<SecurityTipsCardProps> = ({
    title = 'Consejos de Seguridad',
    tips,
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                    <Info className="mr-2 h-5 w-5 text-blue-900" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                    {tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                            <span className="mr-2 text-blue-500">•</span>
                            <span>{tip.text}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default SecurityTipsCard;

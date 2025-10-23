import AvatarCustomer from '@/components/AvatarCustomer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserFormInterface } from '@/interfaces/Profile';
import { getRoleBadge, getStatusBadge } from '@/lib/funtionsUtils';
import { StatusKey } from '@/types';
import { Eye, Mail, Phone } from 'lucide-react';
import React from 'react';

// Recibir funciones para obtener badges e info de roles como props para flexibilidad
type PreviewUserProps = {
    data: UserFormInterface;
};

const PreviewUser: React.FC<PreviewUserProps> = ({
    data
}) => {
    const initials = data.name ? data.name : '??';
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-primary" />
                    Vista Previa
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-3'>
                    <div className="mb-4 flex items-center gap-4">
                        <AvatarCustomer iniciales={initials} />
                        <div className="flex-1">
                            <h4 className="font-bold">
                                {data.name || 'Nombre del usuario'}
                            </h4>
                            {data.role && (
                                <div className="mt-1">
                                    {getRoleBadge(data.role)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Mail className="h-4 w-4" />
                            <span>{data.email || 'email@ejemplo.com'}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="h-4 w-4" />
                            <span>{data.phone || '+591 70000000'}</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Estado:</span>
                        {getStatusBadge(data.status as StatusKey)}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PreviewUser;

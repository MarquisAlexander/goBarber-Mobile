import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Button } from 'react-native';
import api from '../../services/api';


import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList } from './styles';

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const Dashboard: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const  {signOut, user} = useAuth();
    const {navigate} = useNavigation();

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        });
    }, []);

    const navigateToProfile = useCallback(() => {
        // navigate('Profile');
        signOut();
    },[signOut]);

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo, {"\n"}
                    <UserName>
                        Marquis Alexander
                    </UserName>
                </HeaderTitle>

                <ProfileButton onPress={navigateToProfile}>
                    {/* <UserAvatar source={{ uri: user.avatar_url }} /> */}
                </ProfileButton>
            </Header>

            <ProvidersList 
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item }) (

            )}
            />
        </Container>
    );
};

export default Dashboard;
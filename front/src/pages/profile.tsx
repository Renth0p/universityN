import React from 'react';
import Layout from 'src/components/shared/layouts/MainLayout';

import ProfileLayout from '../components/shared/Profile';
import { withAuth } from '../utils/withAuth';

function ProfilePage() {
    return (
        <Layout>
            <ProfileLayout />
        </Layout>
    );
}
export default withAuth(ProfilePage);

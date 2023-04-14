import React from 'react';

import Tabs from '../components/features/contact/ContactTabs';
import Layout from '../components/shared/layouts/MainLayout';
import { withAuth } from '../utils/withAuth';

function ContactPage() {
    return (
        <Layout>
            <Tabs />
        </Layout>
    );
}

export default withAuth(ContactPage);

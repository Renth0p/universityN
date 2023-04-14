import '@/assets/styles/index.sass';

import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { NextSeo } from 'next-seo';
import SEO from 'next-seo.config';
import React, { useEffect, useState } from 'react';

import MockSwitcher from '@/components/shared/utilities/MockSwitcher';
import { StoreProvider } from '@/hooks/useStore';

if (!process.browser && typeof window !== 'undefined') {
    React.useLayoutEffect = useEffect;
}

type DehydratedProps = { dehydratedState: DehydratedState };

function MyApp({ Component, pageProps }: AppProps<DehydratedProps>) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <StoreProvider {...pageProps}>
                    <NextSeo {...SEO} />
                    <MockSwitcher>
                        <Component {...pageProps} />
                    </MockSwitcher>
                </StoreProvider>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        </QueryClientProvider>
    );
}

// Раскомментируйте этот метод только в том случае, если у вас есть необходимость
// передавать данные для каждой страницы приложения.
// Это отключает возможность выполнять автоматическую статическую оптимизацию,
// в результате чего каждая страница в вашем приложении обрабатывается на стороне сервера.

// MyApp.getInitialProps = async (appContext: AppContext) => {
//     const appProps = await App.getInitialProps(appContext);
//     return { ...appProps };
// };

export default MyApp;

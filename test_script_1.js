
        document.addEventListener('DOMContentLoaded', () => {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                setTimeout(() => {
                    const banner = document.getElementById('cookie-consent-bar');
                    if (banner) {
                        banner.classList.add('show');
                        if (window.lucide) {
                            window.lucide.createIcons();
                        }
                    }
                }, 1500);
            }
        });

        function handleCookieChoice(accepted) {
            localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
            const banner = document.getElementById('cookie-consent-bar');
            if (banner) {
                banner.classList.remove('show');
            }
        }
    
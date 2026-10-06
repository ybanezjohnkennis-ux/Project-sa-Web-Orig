<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'WorkBridge') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div class="site-bg" aria-hidden="true"></div>
    @include('partials.navigation')
    <main>
        @yield('content')
    </main>
    <footer class="site-footer">
        <div class="footer-inner">
            <div class="footer-col footer-brand">
                <div class="mini-brand"><span class="mini-mark">W</span><span>WORKBRIDGE</span></div>
                <p class="footer-desc">Connecting practical skills with meaningful opportunities. Build your profile, find work, and hire trusted talent.</p>
            </div>
            <div class="footer-col">
                <h4>Explore</h4>
                <nav class="footer-nav">
                    <button type="button" data-go="about">About WorkBridge</button>
                    <button type="button" data-go="skills">Skills</button>
                    <button type="button" data-go="opportunities">Opportunities</button>
                </nav>
            </div>
            <div class="footer-col">
                <h4>Resources</h4>
                <nav class="footer-nav">
                    <button type="button" data-go="messages">Messages</button>
                    <button type="button" data-go="profile">Profile</button>
                    <button type="button" data-go="contact">Contact</button>
                </nav>
            </div>
            <div class="footer-col footer-contact">
                <h4>Contact</h4>
                <address>
                    <div>support@workbridge.example</div>
                    <div>+63 917 000 0000</div>
                </address>
                <div class="socials">
                    <button aria-label="twitter">Twitter</button>
                    <button aria-label="linkedin">LinkedIn</button>
                    <button aria-label="facebook">Facebook</button>
                </div>
            </div>
        </div>
        <div class="footer-bottom">© {{ date('Y') }} WorkBridge — All rights reserved</div>
    </footer>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>
</body>
</html>

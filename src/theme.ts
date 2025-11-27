export const theme = {
    colors: {
        background: 'hsl(222, 47%, 11%)', // Deep Dark Blue
        surface: 'hsl(217, 33%, 17%)',     // Lighter Blue/Grey
        surfaceHighlight: 'hsl(217, 33%, 22%)',
        primary: 'hsl(210, 100%, 60%)',    // Electric Blue
        primaryHover: 'hsl(210, 100%, 70%)',
        secondary: 'hsl(160, 100%, 50%)',  // Vibrant Green (for pitch accents)
        text: {
            primary: 'hsl(0, 0%, 100%)',
            secondary: 'hsl(215, 20%, 75%)',
            muted: 'hsl(215, 20%, 50%)',
        },
        success: 'hsl(140, 70%, 50%)',
        error: 'hsl(0, 70%, 60%)',
        border: 'hsla(215, 20%, 50%, 0.2)',
    },
    gradients: {
        background: 'linear-gradient(135deg, hsl(222, 47%, 11%) 0%, hsl(220, 40%, 8%) 100%)',
        surface: 'linear-gradient(145deg, hsla(217, 33%, 17%, 0.9) 0%, hsla(217, 33%, 15%, 0.9) 100%)',
        primary: 'linear-gradient(135deg, hsl(210, 100%, 60%) 0%, hsl(200, 100%, 50%) 100%)',
        glass: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    },
    shadows: {
        sm: '0 2px 4px rgba(0,0,0,0.2)',
        md: '0 8px 16px rgba(0,0,0,0.3)',
        lg: '0 16px 32px rgba(0,0,0,0.4)',
        glow: '0 0 20px rgba(56, 189, 248, 0.3)', // Blue glow
    },
    fonts: {
        body: "'Inter', sans-serif",
        heading: "'Outfit', sans-serif",
    },
    borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '24px',
        full: '9999px',
    },
    transitions: {
        default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    }
};

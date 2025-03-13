import './Hero.css'

const Hero = () => {
    const scrollToCatalog = () => {
        const catalogSection = document.querySelector('.catalog');
        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <section className="hero">
            <div className="hero-content">
                <h2>The Cult of the Reader</h2>
                <p>Join to the cult</p>
                <button
                    className="cta-button"
                    onClick={scrollToCatalog}
                >
                    Explore our book catalog
                </button>
            </div>
        </section >
    )
}

export default Hero 
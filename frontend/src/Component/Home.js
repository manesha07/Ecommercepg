import ProductsNav from "./Product_nav"
import Hero from "./Hero"
import HeroPage from "./HeroPage"
import Nav from "./Nav";

export const Home = () => {
    return <>
        <div>
            <Nav />
            <HeroPage />
            <Hero />
            <ProductsNav />
        </div>
    </>
}

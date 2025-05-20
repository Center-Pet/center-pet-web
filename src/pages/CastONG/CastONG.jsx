import CardONG from "../../components/Molecules/CardONG/CardONG";
import "./CastONG.css";

const CastONG = () => {
    const ongData = [
        {
            image: "https://ong.pt/dir/images/sobipro/entries/229/img_selvadosanimais.jpg",
            name: "ONG Resgatando Vidas",
            location: "São Paulo, SP",
            ongId: "12345", // ID da ONG
        },
        {
            image: "https://1.bp.blogspot.com/-C52XJAOK2Jo/USokLOnniaI/AAAAAAAABzE/W-j91PBY5QE/s1600/sociedade-protetora.png",
            name: "Amigos dos Animais",
            location: "Rio de Janeiro, RJ",
            ongId: "67890", // ID da ONG
        },
        {
            image: "https://th.bing.com/th/id/OIP.ToWiOU1vvIYhwY_aFVjsswAAAA?w=400&h=400&rs=1&pid=ImgDetMain",
            name: "Cuidando com Amor",
            location: "Belo Horizonte, MG",
            ongId: "11223", // ID da ONG
        },
        {
            image: "https://ong.pt/dir/images/sobipro/entries/229/img_selvadosanimais.jpg",
            name: "ONG Resgatando Vidas",
            location: "São Paulo, SP",
            ongId: "12345", // ID da ONG
        },
        {
            image: "https://1.bp.blogspot.com/-C52XJAOK2Jo/USokLOnniaI/AAAAAAAABzE/W-j91PBY5QE/s1600/sociedade-protetora.png",
            name: "Amigos dos Animais",
            location: "Rio de Janeiro, RJ",
            ongId: "67890", // ID da ONG
        },
        {
            image: "https://th.bing.com/th/id/OIP.ToWiOU1vvIYhwY_aFVjsswAAAA?w=400&h=400&rs=1&pid=ImgDetMain",
            name: "Cuidando com Amor",
            location: "Belo Horizonte, MG",
            ongId: "11223", // ID da ONG
        },
        {
            image: "https://ong.pt/dir/images/sobipro/entries/229/img_selvadosanimais.jpg",
            name: "ONG Resgatando Vidas",
            location: "São Paulo, SP",
            ongId: "12345", // ID da ONG
        },
        {
            image: "https://1.bp.blogspot.com/-C52XJAOK2Jo/USokLOnniaI/AAAAAAAABzE/W-j91PBY5QE/s1600/sociedade-protetora.png",
            name: "Amigos dos Animais",
            location: "Rio de Janeiro, RJ",
            ongId: "67890", // ID da ONG
        },
        {
            image: "https://th.bing.com/th/id/OIP.ToWiOU1vvIYhwY_aFVjsswAAAA?w=400&h=400&rs=1&pid=ImgDetMain",
            name: "Cuidando com Amor",
            location: "Belo Horizonte, MG",
            ongId: "11223", // ID da ONG
        },
        {
            image: "https://ong.pt/dir/images/sobipro/entries/229/img_selvadosanimais.jpg",
            name: "ONG Resgatando Vidas",
            location: "São Paulo, SP",
            ongId: "12345", // ID da ONG
        },
        {
            image: "https://1.bp.blogspot.com/-C52XJAOK2Jo/USokLOnniaI/AAAAAAAABzE/W-j91PBY5QE/s1600/sociedade-protetora.png",
            name: "Amigos dos Animais",
            location: "Rio de Janeiro, RJ",
            ongId: "67890", // ID da ONG
        },
        {
            image: "https://th.bing.com/th/id/OIP.ToWiOU1vvIYhwY_aFVjsswAAAA?w=400&h=400&rs=1&pid=ImgDetMain",
            name: "Cuidando com Amor",
            location: "Belo Horizonte, MG",
            ongId: "11223", // ID da ONG
        },
        {
            image: "https://ong.pt/dir/images/sobipro/entries/229/img_selvadosanimais.jpg",
            name: "ONG Resgatando Vidas",
            location: "São Paulo, SP",
            ongId: "12345", // ID da ONG
        },
        {
            image: "https://1.bp.blogspot.com/-C52XJAOK2Jo/USokLOnniaI/AAAAAAAABzE/W-j91PBY5QE/s1600/sociedade-protetora.png",
            name: "Amigos dos Animais",
            location: "Rio de Janeiro, RJ",
            ongId: "67890", // ID da ONG
        },
        {
            image: "https://th.bing.com/th/id/OIP.ToWiOU1vvIYhwY_aFVjsswAAAA?w=400&h=400&rs=1&pid=ImgDetMain",
            name: "Cuidando com Amor",
            location: "Belo Horizonte, MG",
            ongId: "11223", // ID da ONG
        },
    ];

    return (
        <div className="conjunt-catalog">
            {ongData.map((ong, index) => (
                <CardONG
                    key={index}
                    image={ong.image}
                    name={ong.name}
                    location={ong.location}
                    ongId={ong.ongId} // Passa o ID da ONG para redirecionamento
                />
            ))}
        </div>
    );
};

export default CastONG;
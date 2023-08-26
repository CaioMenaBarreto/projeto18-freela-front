import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuickOut } from "../hooks/useQuickOut";
import AuthContext from "../contexts/AuthContext";
import { IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";

export default function StorePage() {
    const { name, logout, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    function goNewProductPage() {
        navigate("/newProduct");
    };

    async function handleLogout() {
        const confirmLogout = await Swal.fire({
            title: 'Cuidado',
            text: 'Deseja realmente sair?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, sair!',
            cancelButtonText: 'Cancelar'
        });

        if (confirmLogout.isConfirmed) {
            await logout();
            window.location.href = "/";
        };
    };

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://mecansei.onrender.com/storePage", config);
                setLoading(true)
                setProducts(res.data.message);
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    useQuickOut();
                }
                Swal.fire({
                    title: 'Erro',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    function handleProductClick(id) {
        navigate(`/buyProduct/${id}`);
    };

    function goMyProductsPage() {
        navigate("/myProducts");
    }

    if (loading) {
        return (
            <StoreConteiner>
                <NavBar>
                    <LogoConteiner>
                        <LogoImg src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q" alt="Logo da empresa" />
                        <LogoName>MeCansei</LogoName>
                    </LogoConteiner>
                    <ButtonNewProduct onClick={goNewProductPage}>
                        Novo Produto
                    </ButtonNewProduct>
                    <ButtonMyProducts onClick={goMyProductsPage}>
                        Ver meus produtos
                    </ButtonMyProducts>
                    <NameUser>
                        Olá, {name}!
                    </NameUser>
                    <IonIcon icon={logOutOutline} style={{ fontSize: '38px', marginRight: '30px', color: '#ffffff' }} onClick={handleLogout} />
                </NavBar>
                <ProductsConteiner>
                    <SearchProducts>
                        <ThreeDots color="#1670df" height={80} width={80} />
                    </SearchProducts>
                </ProductsConteiner>
            </StoreConteiner>
        );

    }

    if (products.length === 0) {
        return (
            <StoreConteiner>
                <NavBar>
                    <LogoConteiner>
                        <LogoImg src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q" alt="Logo da empresa" />
                        <LogoName>MeCansei</LogoName>
                    </LogoConteiner>
                    <ButtonNewProduct onClick={goNewProductPage}>
                        Novo Produto
                    </ButtonNewProduct>
                    <ButtonMyProducts onClick={goMyProductsPage}>
                        Ver meus produtos
                    </ButtonMyProducts>
                    <NameUser>
                        Olá, {name}!
                    </NameUser>
                    <IonIcon icon={logOutOutline} style={{ fontSize: '38px', marginRight: '30px', color: '#ffffff' }} onClick={handleLogout} />
                </NavBar>
                <ProductsConteiner>
                    <NoHaveProducts>
                        Não há produtos disponíveis na loja
                    </NoHaveProducts>
                </ProductsConteiner>
            </StoreConteiner>
        );
    }

    return (
        <StoreConteiner>
            <NavBar>
                <LogoConteiner>
                    <LogoImg src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q" alt="Logo da empresa" />
                    <LogoName>MeCansei</LogoName>
                </LogoConteiner>
                <ButtonNewProduct onClick={goNewProductPage}>
                    Novo Produto
                </ButtonNewProduct>
                <ButtonMyProducts onClick={goMyProductsPage}>
                    Ver meus produtos
                </ButtonMyProducts>
                <NameUser>
                    Olá, {name}!
                </NameUser>
                <IonIcon icon={logOutOutline} style={{ fontSize: '38px', marginRight: '30px', color: '#ffffff' }} onClick={handleLogout} />
            </NavBar>
            <ProductsConteiner>
                {products.map((product) => (
                    <Product key={product.id} onClick={() => handleProductClick(product.id)}>
                        <ImageProduct src={product.photo} />
                        <Description>
                            <NameProduct>{product.name}</NameProduct>
                            <ValueProduct>Preço: {product.value}</ValueProduct>
                            <ValueDescription>{product.description}</ValueDescription>
                        </Description>
                    </Product>
                ))}
            </ProductsConteiner>
        </StoreConteiner>
    );
};

const StoreConteiner = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
`
const NavBar = styled.div`
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1670df;
    z-index: 10;
`;

const ButtonNewProduct = styled.button`
    position: absolute;
    width: 80px;
    height: 40px;
    background-color: green;
    border: none;
    border-radius: 7px;
    color: #ffffff;
    font-size: 13px;
    font-family: 'Vollkorn', serif;
    right: 90px;
    cursor: pointer;
`;

const ButtonMyProducts = styled.button`
    position: absolute;
    width: 80px;
    height: 40px;
    background-color: #ffffff;
    border: none;
    border-radius: 7px;
    color: #1670df;
    font-size: 13px;
    font-family: 'Vollkorn', serif;
    right: 190px;
    cursor: pointer;
`;

const NameUser = styled.div`
    position: absolute;
    left: 30px;
    font-size: 25px;
    font-family: 'Vollkorn', serif;
    color: #ffffff;
`

const LogoConteiner = styled.div`
    width: 100%;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoImg = styled.img`
    background-image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdPmhNa0zJrX0rXeQSo9UVSeE5eQxz_4X4g_15HflV0EtHjK4Q";
    border-radius: 100%;
    width: 53px;
    height: 50px;
    margin-bottom: 5px;
    z-index: 2;
`;

const LogoName = styled.p`
    font-size: 23px;
    color: #ffffff;
    font-family: 'Vollkorn', serif;
    z-index: 2;
`;

const ProductsConteiner = styled.div`
    font-family: 'Vollkorn', serif;
    color: #1670df;
    font-size: 33px;
    width: 90%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 100px;
`;

const SearchProducts = styled.div`
    margin-left: 44%;
    margin-top: 21%;
`

const NoHaveProducts = styled.p`
    font-family: 'Vollkorn', serif;
    color: #1670df;
    font-size: 33px;
    margin-left: 32%;
    margin-top: 21%;
`

const Product = styled.div`
    width: 470px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 7px;
    margin-bottom: 20px;
    display: flex;
    box-shadow: 4px 8px 12px rgba(19, 60, 209, 0.8);
    cursor: pointer;
    &:hover {
        background-color: #1670df;
    }
`;

const ImageProduct = styled.img`
    width: 50%;
    height: 100%;
    border-radius: 7px;
`;

const NameProduct = styled.p`
    font-family: 'Vollkorn', serif;
    font-size: 23px;
    color: black;
    margin-bottom: 11px;
`;

const ValueProduct = styled.p`
    font-family: 'Vollkorn', serif;
    font-size: 23px;
    color: black;
    margin-bottom: 11px;
`;

const ValueDescription = styled.p`
    font-family: 'Vollkorn', serif;
    font-size: 23px;
    color: black;
    margin-bottom: 11px;
`;

const Description = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    padding-left: 7px;
    
`;
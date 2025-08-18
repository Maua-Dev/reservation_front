interface CardWarningsProps {
    titulo: string;
    data: string;
    conteudo: string;
}


const CardWarnings: React.FC<CardWarningsProps> = ({titulo, data, conteudo}) => {
    return(
        <div className="h-[150px] w-[500px] bg-gray-200 overflow-y rounded-md text-black font-bold font-poppins mb-5">
            <div className="flex inline h-[40px] w-[400px] gap-5 pl-3 pt-2">
                <h4 className="text-white bg-blue-400 h-[30px] w-[100px] text-center rounded- text-lg rounded-md">{titulo}</h4>
                <h4 className="w-[120px] h-[40px] text-base font-semibold">{data}</h4>
            </div>
            <div className="h-[160px] w-[400px] text-base pt-3 pl-3">
                <p>{conteudo}</p>
            </div>
        </div>
    );
};

export default CardWarnings;
import { useNavigate } from 'react-router-dom';

export const History = {
    navigate: null,
    push: (page) => {
        if (History.navigate) {
            History.navigate(page);
        }
    },
};

const NavigateSetter = () => {
    History.navigate = useNavigate();

    return null;
};

export default NavigateSetter;

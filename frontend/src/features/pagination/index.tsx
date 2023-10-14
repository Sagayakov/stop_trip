import { ArrowLeft14x7 } from '../../shared/ui/icons/icons-tools/ArrowLeft14x7';
import { ArrowRight14x7 } from '../../shared/ui/icons/icons-tools/ArrowRight14x7';

export const Pagination = () => {
    return (
        <div className="pagination">
            <ArrowLeft14x7
                color="#BCBCBC"
                style={{ marginRight: '12px', cursor: 'pointer' }}
            />
            <ArrowRight14x7
                color="#1C1C1E"
                style={{ marginLeft: '12px', cursor: 'pointer' }}
            />
        </div>
    );
};

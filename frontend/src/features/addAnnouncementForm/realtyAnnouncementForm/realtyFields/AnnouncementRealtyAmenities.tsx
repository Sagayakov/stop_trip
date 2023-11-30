interface Props {
    descript: string | undefined;
    setDescript: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AnnouncementRealtyAmenities = ({ descript, setDescript }: Props) => {
    return (
        <div className="ann-field">
            <h3>Удобства</h3>
            <textarea
                placeholder="Пожалуйста, через запятую перечислите желаемые удобства"
                maxLength={1000}
                value={descript}
                onChange={(event) => setDescript(event.target.value)}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

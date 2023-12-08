interface Props {
    descript: string | undefined;
    setDescript: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AnnouncementDescriptionField = ({ descript, setDescript }: Props) => {
    return (
        <div className="ann-field">
            <h3>Описание:</h3>
            <textarea
                placeholder="Описание"
                maxLength={1000}
                value={descript}
                onChange={(event) => setDescript(event.target.value)}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};

export default AnnouncementDescriptionField;
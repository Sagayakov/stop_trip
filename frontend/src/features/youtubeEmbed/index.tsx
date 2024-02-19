import styles from './youtubeEmbed.module.scss';

type YoutubeEmbedProps = {
    link: string;
};

export const YoutubeEmbed = ({ link }: YoutubeEmbedProps) => {
    return (
        <div className={styles.product_video}>
            <iframe
                width="100%"
                height="480"
                src={link}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
};

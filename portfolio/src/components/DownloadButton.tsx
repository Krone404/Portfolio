interface Props {
    fileDir: string;
    fileName: string;
    children: string;
}

const DownloadButton = ({ fileDir, fileName, children }: Props) => {
  return (
    <a href={`${fileDir}`} download={fileName} className="download-button">
      {children}
    </a>
  );
};

export default DownloadButton;

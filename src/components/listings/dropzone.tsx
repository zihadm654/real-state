import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { HiXMark } from "react-icons/hi2";

interface FileWithPreview extends File {
  preview: string;
}

interface DropzoneProps {
  className?: string;
  name: string;
  register: any;
  form: any;
}

const Dropzone: React.FC<DropzoneProps> = ({
  className,
  name,
  register,
  form,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const photos = form.watch("photos");
  // on photos & files drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const paths = acceptedFiles.map((file) => file.name);
      form.setValue(name, paths, { shouldValidate: true });
      if (acceptedFiles?.length) {
        setFiles((previousFiles: any[]) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]);
      }
    },
    [name, form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file: any) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
  };
  return (
    <>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input
          {...getInputProps()}
          {...register(name)}
          id={name}
          accept="image/*"
        />
        <div className="dropzone__content">
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
          <button>Upload Photos</button>
        </div>
      </div>

      {/* Preview */}
      <section className="preview">
        <div className="preview__info">
          <h5 className="title text-3xl font-semibold">Preview</h5>
          <button type="button" onClick={removeAll}>
            Remove all files
          </button>
        </div>

        <ul className="mt-2 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {files?.map((file: any) => (
            <li key={file.name} className="relative h-32 rounded-md shadow-lg">
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="h-full w-full rounded-md object-contain"
              />
              <button
                type="button"
                className="border-secondary-400 bg-secondary-400 absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border transition-colors hover:bg-white"
                onClick={() => removeFile(file.name)}
              >
                <HiXMark className="hover:fill-secondary-400 h-5 w-5 border-black fill-black transition-colors" />
              </button>
              <p className="mt-2 text-[12px] font-medium text-neutral-500">
                {file.name}
              </p>
            </li>
          )) || photos?.map((item: any) => <p key={item.path}>{item.path}</p>)}
        </ul>
      </section>
    </>
  );
};

export default Dropzone;

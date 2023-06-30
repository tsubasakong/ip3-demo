from rich import inspect
import datasets 
from datasets import load_dataset
from sentence_transformers import SentenceTransformer, util
from huggingface_hub import notebook_login

def run_similarity_search()
    inspect(datasets.Image, help=True)

    dataset = load_dataset("imagefolder", data_files="https://zenodo.org/record/6224034/files/embellishments_sample.zip?download=1")
    dataset = dataset['train']
    dataset[0]
    dataset.features['label']



    dataset.push_to_hub('davanstrien/embellishments-sample', private=True)
    dataset = load_dataset("davanstrien/embellishments-sample", use_auth_token=True)
    model = SentenceTransformer('clip-ViT-B-32')

    ds_with_embeddings = dataset.map(
        lambda example: {'embeddings':model.encode(example['image'], device='cuda')}, batched=True, batch_size=32)

    ds_with_embeddings.push_to_hub('davanstrien/embellishments-sample', private=True)
    ds_with_embeddings['train'].add_faiss_index(column='embeddings')
    prompt = model.encode("A steam engine")
    scores, retrieved_examples = ds_with_embeddings['train'].get_nearest_examples('embeddings', prompt,k=9)

def get_image_from_text(text_prompt, number_to_retrieve=9):
    prompt = model.encode(text_prompt)
    scores, retrieved_examples = ds_with_embeddings['train'].get_nearest_examples('embeddings', prompt,k=number_to_retrieve)
    plt.figure(figsize=(20, 20))
    columns = 3
    for i in range(9):
        image = retrieved_examples['img'][i]
        plt.title(text_prompt)
        plt.subplot(9 / columns + 1, columns, i + 1)
        plt.imshow(image)

if __name__ == '__main__':
    run_similarity_search()
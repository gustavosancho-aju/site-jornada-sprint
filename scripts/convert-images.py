#!/usr/bin/env python3
"""
Conversor de imagens para a landing page JornadaSprint.
Converte JPG/PNG/JPEG para WebP otimizado.

USO:
  1. Coloque os prints do WhatsApp na pasta public/testimonials/raw/
     Com nomes: depo-1.jpg, depo-2.jpg, depo-3.jpg, depo-4.jpg

  2. Coloque os cards das jornadas na pasta public/cards/raw/
     Com nomes: jornada-00-zero.jpg, jornada-01-assistentes.jpg, etc.

  3. Rode: python scripts/convert-images.py

MAPEAMENTO DOS DEPOIMENTOS:
  depo-1 = Mentorada (mulher maravilhada com a imersão)
  depo-2 = Rodrigo Costa VP (produto digital com IA)
  depo-3 = Kiraz Consultora Imobiliária (CRM para vendas)
  depo-4 = Tamiles Bortoletto (calendário editorial com Manus)

MAPEAMENTO DOS CARDS:
  jornada-00-zero      = Do Zero com IA
  jornada-01-assistentes = Assistentes de IA
  jornada-02-navegadores = Navegadores de IA
  jornada-03-videos     = Vídeos com IA
  jornada-04-especialistas = Especialistas com IA
  jornada-05-sites      = Criando Sites com IA
  jornada-06-imagens    = Imagens com IA
  jornada-07-sistemas   = Sistemas com IA
  atendimento-sprint    = Atendimento Sprint
"""

from PIL import Image
import os
import sys

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TESTIMONIALS_RAW = os.path.join(PROJECT_ROOT, 'public', 'testimonials', 'raw')
TESTIMONIALS_OUT = os.path.join(PROJECT_ROOT, 'public', 'testimonials')
CARDS_RAW = os.path.join(PROJECT_ROOT, 'public', 'cards', 'raw')
CARDS_OUT = os.path.join(PROJECT_ROOT, 'public', 'cards')

WEBP_QUALITY = 82  # Good balance of quality vs size


def convert_image(src_path, dst_path, max_width=None):
    """Convert an image to WebP format with optional resize."""
    try:
        img = Image.open(src_path)

        # Convert RGBA to RGB if needed (WebP supports both but smaller as RGB)
        if img.mode == 'RGBA':
            bg = Image.new('RGB', img.size, (0, 0, 0))
            bg.paste(img, mask=img.split()[3])
            img = bg
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # Resize if max_width specified
        if max_width and img.width > max_width:
            ratio = max_width / img.width
            new_size = (max_width, int(img.height * ratio))
            img = img.resize(new_size, Image.LANCZOS)

        img.save(dst_path, 'WEBP', quality=WEBP_QUALITY)
        size_kb = os.path.getsize(dst_path) / 1024
        print(f"  ✅ {os.path.basename(src_path)} → {os.path.basename(dst_path)} ({size_kb:.0f}KB)")
        return True
    except Exception as e:
        print(f"  ❌ Erro: {src_path} → {e}")
        return False


def find_source_file(raw_dir, base_name):
    """Find source file with any common image extension."""
    for ext in ['.jpg', '.jpeg', '.png', '.webp', '.bmp']:
        path = os.path.join(raw_dir, base_name + ext)
        if os.path.exists(path):
            return path
    return None


def process_testimonials():
    """Convert testimonial screenshots."""
    print("\n📱 DEPOIMENTOS WhatsApp")
    print(f"   Pasta raw: {TESTIMONIALS_RAW}")

    if not os.path.exists(TESTIMONIALS_RAW):
        os.makedirs(TESTIMONIALS_RAW, exist_ok=True)
        print("   ⚠️  Pasta raw/ criada. Coloque os prints lá e rode novamente.")
        return 0

    names = ['depo-1', 'depo-2', 'depo-3', 'depo-4']
    converted = 0

    for name in names:
        src = find_source_file(TESTIMONIALS_RAW, name)
        if src:
            dst = os.path.join(TESTIMONIALS_OUT, f'{name}.webp')
            if convert_image(src, dst, max_width=600):
                converted += 1
        else:
            print(f"  ⏭️  {name}.* não encontrado em raw/")

    return converted


def process_cards():
    """Convert course card images."""
    print("\n🎴 CARDS das Jornadas")
    print(f"   Pasta raw: {CARDS_RAW}")

    if not os.path.exists(CARDS_RAW):
        os.makedirs(CARDS_RAW, exist_ok=True)
        print("   ⚠️  Pasta raw/ criada. Coloque os cards lá e rode novamente.")
        return 0

    names = [
        'jornada-00-zero', 'jornada-01-assistentes', 'jornada-02-navegadores',
        'jornada-03-videos', 'jornada-04-especialistas', 'jornada-05-sites',
        'jornada-06-imagens', 'jornada-07-sistemas', 'atendimento-sprint'
    ]
    converted = 0

    for name in names:
        src = find_source_file(CARDS_RAW, name)
        if src:
            dst = os.path.join(CARDS_OUT, f'{name}.webp')
            if convert_image(src, dst, max_width=400):
                converted += 1
        else:
            print(f"  ⏭️  {name}.* não encontrado em raw/")

    return converted


if __name__ == '__main__':
    print("🔄 JornadaSprint — Conversor de Imagens")
    print("=" * 45)

    t = process_testimonials()
    c = process_cards()

    total = t + c
    print(f"\n{'=' * 45}")
    print(f"✨ {total} imagens convertidas ({t} depoimentos, {c} cards)")

    if total == 0:
        print("\n📋 PRÓXIMOS PASSOS:")
        print("   1. Salve os prints do WhatsApp em: public/testimonials/raw/")
        print("      Nomeie como: depo-1.jpg, depo-2.jpg, depo-3.jpg, depo-4.jpg")
        print("   2. Salve os cards em: public/cards/raw/")
        print("      Nomeie como: jornada-00-zero.jpg, jornada-01-assistentes.jpg, ...")
        print("   3. Rode novamente: python scripts/convert-images.py")

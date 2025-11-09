-- Create educational_videos table
CREATE TABLE IF NOT EXISTS public.educational_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_minutes INTEGER,
  education_level education_level NOT NULL,
  category TEXT NOT NULL,
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.educational_videos ENABLE ROW LEVEL SECURITY;

-- Anyone can view videos
CREATE POLICY "Anyone can view educational videos"
ON public.educational_videos
FOR SELECT
USING (true);

-- Teachers and admins can manage videos
CREATE POLICY "Teachers and admins can manage educational videos"
ON public.educational_videos
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_educational_videos_updated_at
BEFORE UPDATE ON public.educational_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
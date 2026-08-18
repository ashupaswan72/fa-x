-- 1. Add document columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS aadhaar_card TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS resident_certificate TEXT;

-- 2. Update the trigger function to capture the documents
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, email, name, role, status, avatar, farm_name, phone, address, verified, coords, aadhaar_card, resident_certificate
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), 
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
    COALESCE(NEW.raw_user_meta_data->>'status', 'verified'),
    COALESCE(NEW.raw_user_meta_data->>'avatar', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'),
    NEW.raw_user_meta_data->>'farm_name',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'address',
    COALESCE((NEW.raw_user_meta_data->>'verified')::boolean, false),
    (NEW.raw_user_meta_data->>'coords')::jsonb,
    NEW.raw_user_meta_data->>'aadhaar_card',
    NEW.raw_user_meta_data->>'resident_certificate'
  );
  
  INSERT INTO public.wallets (uid, balance, reward_points, transactions)
  VALUES (NEW.id, 0, 0, '[]');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create Admin approval RPC to bypass RLS
CREATE OR REPLACE FUNCTION public.approve_farmer_kyc(target_uid UUID)
RETURNS void AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
    UPDATE public.profiles SET status = 'verified', verified = true WHERE id = target_uid;
    
    -- Safely update auth.users metadata
    UPDATE auth.users 
    SET raw_user_meta_data = jsonb_set(COALESCE(raw_user_meta_data, '{}'::jsonb), '{status}', '"verified"') 
    WHERE id = target_uid;
  ELSE
    RAISE EXCEPTION 'Not authorized. Only admins can approve KYC.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
